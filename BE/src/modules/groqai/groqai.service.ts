import { Injectable } from '@nestjs/common';
import { ShowtimeService } from '../showtime/showtime.service';
import { TheaterService } from '../theater/theater.service';
import { ChatGroq } from '@langchain/groq';

@Injectable()
export class GroqaiService {
  private llm;
  private chatHistory = [];
  private state = {
    province: '',
    theater: '',
    movie: '',
  };

  constructor(
    private readonly showtimeService: ShowtimeService,
    private readonly theaterService: TheaterService,
  ) {
    this.llm = new ChatGroq({
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      maxTokens: 10000,
      maxRetries: 2,
    });
  }

  private resetState() {
    this.chatHistory = [];
    this.state = {
      province: '',
      theater: '',
      movie: '',
    };
  }

  async processMessage(input: string) {
    const farewellKeywords = [
      'bye',
      'goodbye',
      'see you',
      'later',
      'farewell',
      'take care',
    ];
    const greetingKeywords = [
      'hello',
      'hi',
      'hey',
      'good morning',
      'good afternoon',
      'good evening',
      'howdy',
    ];

    const provinceRegex = /I am in (.+)/i;
    const theaterRegex = /I choose theater: (.+)/i;
    const movieRegex = /I choose movie: (.+)/i;

    // Prompt cho AI
    const aiPrompt = `
      You are a helpful assistant for a movie booking service.
      When a user asks about movies showing today, first ask them for their province.
      After they provide their province, list the theaters in that province.
      Once they choose a theater, list the movies currently showing at that theater.
      Finally, when a movie is selected, provide the available showtimes for that movie.
      Always respond in a friendly and informative manner.
    `;

    // Xử lý chào hỏi
    if (
      greetingKeywords.some((keyword) => input.toLowerCase().includes(keyword))
    ) {
      this.resetState();
      return { message: 'Hello! How can I assist you today?' };
    }

    // Xử lý tạm biệt
    if (
      farewellKeywords.some((keyword) => input.toLowerCase().includes(keyword))
    ) {
      this.resetState();
      return { message: 'Goodbye! It was a pleasure to assist you!' };
    }

    try {
      // Gọi AI để xử lý câu hỏi của người dùng
      const aiResponse = await this.llm.invoke([
        {
          role: 'system',
          content: aiPrompt,
        },
        {
          role: 'user',
          content: input,
        },
      ]);

      // Xử lý phản hồi từ AI
      const responseMessage = aiResponse.content;

      // Kiểm tra các yêu cầu cụ thể
      if (
        responseMessage.toLowerCase().includes('what movies are showing today')
      ) {
        return { message: 'Which province are you in?' };
      }

      // Nhận tỉnh từ người dùng
      const provinceMatch = input.match(provinceRegex);
      if (provinceMatch) {
        this.state.province = provinceMatch[1].trim();
        const theaters = await this.theaterService.getAll({
          skip: 0,
          limit: 50,
        });
        const theatersInProvince = theaters.filter(
          (t) => t.theater_complex.province === this.state.province,
        );

        // Kiểm tra xem có rạp nào không
        if (!theatersInProvince.length) {
          return {
            message: `Sorry, there are no theaters in ${this.state.province}. Please choose another province.`,
          };
        }

        const theaterList = theatersInProvince.map((t) => t.name).join(', ');
        return {
          message: `Theaters in ${this.state.province} are: ${theaterList}. Please choose a theater by saying "I choose theater: [theater name]".`,
        };
      }

      // Nhận tên rạp từ người dùng
      const theaterMatch = input.match(theaterRegex);
      if (theaterMatch) {
        this.state.theater = theaterMatch[1].trim();
        const theaters = await this.theaterService.getAll({
          skip: 0,
          limit: 50,
        });
        const theater = theaters.find((t) => t.name === this.state.theater);

        // Kiểm tra xem rạp có tồn tại không
        if (!theater) {
          return {
            message: `Sorry, we couldn't find the theater named ${this.state.theater}. Please try again.`,
          };
        }

        const showtimes =
          await this.showtimeService.getShowtimesByTheaterAndDate(
            theater.id,
            new Date().toISOString(),
          );
        const movieTitles = [...new Set(showtimes.map((s) => s.movie.title))];

        // Kiểm tra xem có phim nào đang chiếu không
        if (!movieTitles.length) {
          return {
            message: `Sorry, there are no movies showing at ${this.state.theater} today. Please choose another theater.`,
          };
        }

        const movieList = movieTitles.join(', ');
        return {
          message: `Movies currently showing at ${this.state.theater} are: ${movieList}. Please choose a movie by saying "I choose movie: [movie name]".`,
        };
      }

      // Nhận tên phim từ người dùng
      const movieMatch = input.match(movieRegex);
      if (movieMatch) {
        this.state.movie = movieMatch[1].trim();
        const showtimes = await this.showtimeService.getAll({
          skip: 0,
          limit: 50,
        });
        const selectedShowtimes = showtimes.filter(
          (s) => s.movie.title === this.state.movie,
        );

        // Kiểm tra xem có suất chiếu nào không
        if (!selectedShowtimes.length) {
          return {
            message: `Sorry, there are no showtimes for ${this.state.movie} today. Please choose another movie.`,
          };
        }

        const showtimeList = selectedShowtimes
          .map((s) => s.showtime_start)
          .join(', ');
        return {
          message: `Showtimes for ${this.state.movie} are: ${showtimeList}. Please choose a time to book.`,
        };
      }

      return {
        message:
          "I'm sorry, I didn't understand that. Could you please clarify?",
      };
    } catch (error) {
      console.error('Error processing message:', error);
      return {
        message:
          'Sorry, there was an error processing your request. Please try again later.',
      };
    }
  }
}

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User } from '@/types/user.type'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'

export default function UserDetail() {
  const [userDetail, setUserDetail] = useState<User | null>(null)
  const [token, setToken] = useState<string>()
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: ''
  })

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    const userDataString = localStorage.getItem('user')

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString)
        const { fullName, email, dateOfBirth, phoneNumber } = userData
        setUserDetail(userData)
        setFormValues({
          fullName,
          email,
          dateOfBirth: new Date(dateOfBirth).toISOString().split('T')[0],
          phoneNumber
        })
      } catch (error) {
        console.error('Error parsing user data:', error)
        toast.error('Failed to load user data.')
      }
    } else {
      console.log('No user data found.')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleSave = async () => {
    const getAccessToken = localStorage.getItem('access_token')
    if (getAccessToken) {
      let token = JSON.parse(getAccessToken)

      if (!token) {
        toast.error('Authorization token is missing.')
        return
      }

      try {
        const response = await fetch(`http://localhost:3000/api/v1/user/update/${userDetail?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formValues)
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error('Error response:', errorData)
          throw new Error(`Failed to update user: ${errorData || 'Unknown error'}`)
        }

        const updatedUser = await response.json()
        toast.success('User updated successfully!')
        setUserDetail(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
      } catch (error) {
        console.error('Error updating user:', error)
        toast.error(`Error updating user: ${error || 'Unknown error'}`)
      }
    }
  }

  const handlePasswordChange = async () => {
    const getAccessToken = localStorage.getItem('access_token')
    if (getAccessToken) {
      let token = JSON.parse(getAccessToken)

      console.log(token)
      if (!token) {
        toast.error('Authorization token is missing.')
        return
      }

      if (newPassword !== confirmPassword) {
        toast.error('New passwords do not match!')
        return
      }

      try {
        const response = await fetch(`http://localhost:3000/api/v1/user/change-password/${userDetail?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ currentPassword, newPassword })
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error('Error response:', errorData)
          throw new Error(`Failed to change password: ${errorData.message || 'Unknown error'}`)
        }

        toast.success('Password changed successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } catch (error) {
        console.error('Error changing password:', error)
        toast.error(`Error changing password: ${error || 'Unknown error'}`)
      }
    }
  }

  return (
    <div className='w-[80%] m-auto flex justify-center p-5'>
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='password'>Password</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              {Object.entries(formValues).map(([key, value]) => (
                <div key={key} className='space-y-1'>
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Label>
                  <Input
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    type={key === 'dateOfBirth' ? 'date' : 'text'}
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='password'>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
                <div key={field} className='space-y-1'>
                  <Label htmlFor={field}>
                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </Label>
                  <Input
                    id={field}
                    type='password'
                    value={
                      field === 'currentPassword'
                        ? currentPassword
                        : field === 'newPassword'
                          ? newPassword
                          : confirmPassword
                    }
                    onChange={(e) => {
                      if (field === 'currentPassword') setCurrentPassword(e.target.value)
                      if (field === 'newPassword') setNewPassword(e.target.value)
                      if (field === 'confirmPassword') setConfirmPassword(e.target.value)
                    }}
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={handlePasswordChange}>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Toaster position='top-right' />
    </div>
  )
}

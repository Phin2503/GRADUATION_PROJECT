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
  const [token, setToken] = useState<string>('')
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
      const userData = JSON.parse(userDataString)
      setToken(userData.access_token)
      const { fullName, email, dateOfBirth, phoneNumber } = userData.payload
      setUserDetail(userData.payload)
      setFormValues({
        fullName,
        email,
        dateOfBirth: new Date(dateOfBirth).toISOString().split('T')[0],
        phoneNumber
      })
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
    try {
      const response = await fetch(`http://localhost:3000/api/v1/user/update/${userDetail?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName: formValues.fullName,
          email: formValues.email,
          dateOfBirth: formValues.dateOfBirth,
          phoneNumber: formValues.phoneNumber
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Failed to update user: ${errorData.message || 'Unknown error'}`)
      }

      const updatedUser = await response.json()
      toast.success('User updated successfully!!')
      setUserDetail(updatedUser)
      localStorage.setItem('user', JSON.stringify({ payload: updatedUser }))
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handlePasswordChange = async () => {
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
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Failed to change password: ${errorData.message || 'Unknown error'}`)
      }

      toast.success('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      toast.error(`${error}.Please try again.`)
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
              <div className='space-y-1'>
                <Label htmlFor='fullName'>Full Name</Label>
                <Input id='fullName' name='fullName' value={formValues.fullName} onChange={handleChange} />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' name='email' value={formValues.email} onChange={handleChange} />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='dob'>Date of Birth</Label>
                <Input id='dob' name='dateOfBirth' value={formValues.dateOfBirth} type='date' onChange={handleChange} />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input id='phone' name='phoneNumber' value={formValues.phoneNumber} onChange={handleChange} />
              </div>
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
              <div className='space-y-1'>
                <Label htmlFor='current'>Current password</Label>
                <Input
                  id='current'
                  type='password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='new'>New password</Label>
                <Input id='new' type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='confirm'>Confirm new password</Label>
                <Input
                  id='confirm'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
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

import { Button } from '@radix-ui/themes'
import { PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'

const UserPage = () => {
  return (
    <div>
      <Button variant='outline' color='gray'>
        <PersonIcon />
        <Link href={"/users/newUser"}>New User</Link>
      </Button>
    </div>
  )
}

export default UserPage

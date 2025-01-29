import { Button } from '@radix-ui/themes'
import { PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'

const UserPage = () => {
  return (
    <div>
      <Button variant='surface' color='green'>
        <PersonIcon />
        <Link href={"/users/new"}>New User</Link>
      </Button>
    </div>
  )
}

export default UserPage

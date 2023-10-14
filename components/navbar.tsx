import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MainNav } from './ui/main-nav'
import { getAllCategories } from '@/actions/get-data'
import { Cart } from './nav-cart'

interface NavBarProps {
}

export const NavBar = async () => {
  const categories = await getAllCategories();

  return (
    <div className='mx-auto max-w-7xl lg:px-5 flex flex-row items-center justify-between'>
        <Logo />

        <MainNav categories={categories} />

        <Cart />
    </div>
  )
}

const Logo = () => {
  return (
    <div>
      <Link href={'/'}>
          <Image 
          src={'/logo_light.jpg'}
          alt='Logo'
          width={100}
          height={100}
          />
      </Link>
    </div>  
  )
}
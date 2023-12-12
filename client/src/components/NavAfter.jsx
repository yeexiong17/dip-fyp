import {
    Avatar,
    Dropdown,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
    Button,
} from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavAfter() {
    return (
        <Navbar fluid rounded className="sticky top-0 w-full" >
            <NavbarBrand href="#">
                <img src="/favicon.svg" className="mr-3 h-6 sm:h-12" alt="" />
                <span className="self-center whitespace-nowrap text-4xl font-semibold dark:text-white">Resolve</span>
            </NavbarBrand>
            <div className="flex md:order-2 space-x-7 mr-7">
                <div className="flex space-x-3">
                    <Link to="/form">
                        <Button variant="gradient" size="sm" fullWidth>
                            Need Help?
                        </Button>
                    </Link>
                </div>
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="" rounded />
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm">Eren Yeager</span>
                        <span className="block truncate text-sm font-medium">eren@gmail.com</span>
                    </DropdownHeader>
                    <DropdownItem>Your Profile</DropdownItem>
                    <DropdownItem>Sign out</DropdownItem>
                </Dropdown>
                <NavbarToggle />
            </div>
            <div className="ml-32">
                <NavbarCollapse>
                    <NavbarLink href="/home"><span className="text-lg">Home</span></NavbarLink>
                    <NavbarLink href="/aboutus"><span className="text-lg">About</span></NavbarLink>
                    <NavbarLink href="/menu"><span className="text-lg">Services</span></NavbarLink>
                    <NavbarLink href="/contact"><span className="text-lg">Contact</span></NavbarLink>
                    <NavbarLink href="#"><span className="text-lg">FAQ</span></NavbarLink>
                </NavbarCollapse>
            </div>
        </Navbar >
    );
}

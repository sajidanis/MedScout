import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaBars, FaFile, FaHome, FaSignOutAlt, FaTimes } from 'react-icons/fa';

const SideBar = () => {

    const [collapsed, setCollapsed] = useState(true);

    const handleCollapseToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Sidebar collapsed={collapsed} >
            <div className="h-screen top-0 left-0 z-10 bg-gray-900 transition-all ease-in duration-300 space-y-2 fixed sm:sticky ">
                <button className="m-4 collapse-btn text-gray-200" onClick={handleCollapseToggle}>
                    {collapsed ? <FaBars /> : <FaTimes />}
                </button>
                <div className="m-2 sidebar-header w-3/4 self-center py-8">
                    <img className='items-center' src={`${collapsed ? "../images/MedScout2.png" : "../images/MedScout1.png" }`} alt="Logo" />
                </div>

                {/* Sidebar content */}
                <Menu iconShape="circle">
                    {/* Dashboard */}
                    <MenuItem icon={<FaHome />} className="items-center text-gray-200 hover:text-gray-200 hover:bg-gray-800 space-x-2 rounded-md p-2 cursor-pointer text-lg">Dashboard</MenuItem>
                    <MenuItem icon={<FaFile />} className="items-center text-gray-200 hover:text-gray-200 hover:bg-gray-800 space-x-2 rounded-md p-2 cursor-pointer text-lg">Browse Files</MenuItem>
                    <MenuItem icon={<FaSignOutAlt />} className="items-center text-gray-200 hover:text-gray-200 hover:bg-gray-800 space-x-2 rounded-md p-2 cursor-pointer text-lg">Sign Out</MenuItem>
                </Menu>

                {/* Collapse/Expand button */}
                
            </div>

        </Sidebar>
    )
}

export default SideBar;
import React from 'react';
import Sidebar from '../sidebar';
import './index.scss';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='App'>
      <Sidebar />
      <div className="page" style={{ backgroundColor: '#000000' }}>
        
      <div id="space">
        <div class="stars"></div>
        <div class="stars"></div>
        <div class="stars"></div>
        <div class="stars"></div>
        <div class="stars"></div>
      </div>

        <span className='tags top-tags'>&lt;body&gt;</span> 

        <Outlet />

        <span className='tags bottom-tags'>
          &lt;/body&gt;
          <br />
          <span className='bottom-tag-html'>&lt;/html&gt;</span>
        </span>
      </div>
    </div>
  );
}

export default Layout;

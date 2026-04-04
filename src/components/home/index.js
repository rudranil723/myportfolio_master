import { useEffect, useState } from 'react'
import $ from 'jquery'; // Import jQuery
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import LogoTitle from '../../assets/images/logg.png';
import image1 from '../../assets/images/1.png';
import image2 from '../../assets/images/2.png';
import image3 from '../../assets/images/3.jpeg';
import image4 from '../../assets/images/4.jpeg';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters'


const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = ['u', 'd', 'r', 'a', 'n', 'i', 'l']
    const jobArray = ['w', 'e', 'b', ' ', 'd', 'e', 'v', 'l', 'o', 'p', 'e', 'r']

    

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);
        return () => clearTimeout(timeoutId);
    }, []); 
    
    useEffect(() => {
        $(".option").click(function () {
          $(".option").removeClass("active");
          $(this).addClass("active");
        });
      }, []);  
         
    return (
        <div className="container home-page" >
            <div className="text-zone">
                <h1>
                    <span className={letterClass}>H</span>
                    <span className={`${letterClass} _12`}>i,</span>
                    <br />
                    <span className={`${letterClass} _13`}>I</span>
                    <span className={`${letterClass} _14`}>'m</span>

                    <img className = 'namelogo' src={LogoTitle} style={{width: '60px', height: '60px'}} alt="devloper"/>
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={nameArray}
                        idx={15}
                    />
                    <br/>
                    <AnimatedLetters
                        letterClass={`${letterClass} yellow-text`} 
                        strArray={jobArray}
                        idx={22}
                    />
                </h1>
                <h2>Frontend devloper/ software devloper</h2>
                <Link to="/contact" className='flat-button'> CONTACT ME</Link>
            </div>
            
            <div className='right-container'>
            <div class="options">
            <div class="option active option-background" style={{backgroundImage: `url(${image1})`}}>
                    <div class="shadow"></div>
                    <div class="label">
                        <div class="icon">
                            <i class="fas fa-calculator"></i>
                        </div>
                        <div class="info">
                            <div class="main">React calculator</div>
                            <div class="sub">calculator designed using react</div>
                        </div>
                    </div>
                </div>
                <div class="option option-background" style={{backgroundImage: `url(${image2})`}} >
                    <div class="shadow"></div>
                    <div class="label">
                        <div class="icon">
                            <i class="fas fa-snowflake"></i>
                        </div>
                        <div class="info">
                            <div class="main">Weather App</div>
                            <div class="sub">Weather App designed using HTML,CSS,Js</div>
                        </div>
                    </div>
                </div>
                <div class="option option-background" style={{backgroundImage: `url(${image3})`}} >
                    <div class="shadow"></div>
                    <div class="label">
                        <div class="icon">
                            <i class="fas fa-tree"></i>
                        </div>
                        <div class="info">
                            <div class="main">Python Chatbot</div>
                            <div class="sub">Python Project</div>
                        </div>
                    </div>
                </div>
                <div class="option option-background" style={{backgroundImage: `url(${image4})`}} >
                    <div class="shadow"></div>
                    <div class="label">
                        <div class="icon">
                            <i class="fas fa-tint"></i>
                        </div>
                        <div class="info">
                            <div class="main">Portfolio Website</div>
                            <div class="sub">my portfolio website</div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}


export default Home
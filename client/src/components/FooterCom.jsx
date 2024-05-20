import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
        <div className="w-full max-w-7xl mx-auto">
           <div className="grid w-full justify between sm:flex md:grid-cols-1">
              <div className="mt-5 mr-5">
                  <Link
                      to='/'
                      className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
                    >
                      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                        Mati
                      </span>
                      Blog
               </Link>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                <Footer.Title title='About'/>
                  <Footer.LinkGroup col>
                    <Footer.Link 
                         href='https://github.com/matidlr'
                         target='_blank'
                         rel='noopener noreferrer'
                         >
                       My projects
                    </Footer.Link>
                  </Footer.LinkGroup>
                  <Footer.LinkGroup col>
                    <Footer.Link 
                         href='https://github.com/matidlr'
                         target='_blank'
                         rel='noopener noreferrer'
                         >
                       My blog
                    </Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title='My work'/>
                  <Footer.LinkGroup col>
                    <Footer.Link 
                         href='https://github.com/matidlr'
                         target='_blank'
                         rel='noopener noreferrer'
                         >
                      Github
                    </Footer.Link>
                  </Footer.LinkGroup>
                  <Footer.LinkGroup col>
                    <Footer.Link 
                         href='#'
                         target='_blank'
                         rel='noopener noreferrer'
                         >
                       Linkedin
                    </Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title='Legal'/>
                  <Footer.LinkGroup col>
                    <Footer.Link 
                         href='https://github.com/matidlr'
                         target='_blank'
                         rel='noopener noreferrer'
                         >
                      Terms & conditions
                    </Footer.Link>
                  </Footer.LinkGroup>
                  <Footer.LinkGroup col>
                    <Footer.Link 
                         href='#'
                         target='_blank'
                         rel='noopener noreferrer'
                         >
                      Privacy policy
                    </Footer.Link>
                  </Footer.LinkGroup>
                </div>
              </div>
           </div>
           <Footer.Divider />
           <div className="w-full sm:flex sm:items-center sm:justify-between">
              <Footer.Copyright 
                    href="#" 
                    by='Mati blog' 
                    year={new Date().getFullYear()}/>

                    <div className="flex gap-6 sm:mt-3 mt-4 sm:justify-center mb-3" >
                      <Footer.Icon href='#' icon={BsFacebook}/>
                      <Footer.Icon href='#' icon={BsInstagram}/>
                      <Footer.Icon href='#' icon={BsTwitter}/>
                      <Footer.Icon href='#' icon={BsGithub}/>
                    </div>
           </div>

        </div>
      </Footer>
  );
};


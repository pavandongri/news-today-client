import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

import React from 'react'

const Footer = () => {
    return (
        <div className='footer'>
            <footer className="">
                <div className="row text-center">
                    <div className="col-6 col-md-2 mb-3">
                        <h5>Trending</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="/movies" className="nav-link p-0  ">Movies</a></li>
                            <li className="nav-item mb-2"><a href="/beauty" className="nav-link p-0  ">Beauty</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Sports</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="/cricket" className="nav-link p-0  ">Cricket</a></li>
                            <li className="nav-item mb-2"><a href="/football" className="nav-link p-0  ">Football</a></li>
                        </ul>
                    </div>

                    <div className="col-md-5 offset-md-1 mb-3">
                        <form>
                            <h5>Subscribe to our newsletter</h5>
                            <p>Monthly digest of what's new and exciting from us.</p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label for="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                <button className="btn btn-primary" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-2 border-top">
                    <p>© 2025 Company, Inc. All rights reserved.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faSquareFacebook} size="2x" />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faSquareTwitter} size="2x" />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faSquareInstagram} size="2x" />
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer
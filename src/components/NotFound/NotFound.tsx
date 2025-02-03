import React from "react";
import { Link } from "react-router-dom";
import './NotFound.scss';


export default function NotFound() {
  return (
    <section className="notFound__container">
      <div className="notFound__emoji">
        🤷🏻‍♂️🤔😵‍💫
      </div>
      <div className="notFound__message">
        You should probably <Link to={{pathname: '/'}}>login</Link>
      </div>
    </section>
  );
}

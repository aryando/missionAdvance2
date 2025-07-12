import React from 'react';
import PropTypes from 'prop-types';

export default function CourseCard({ image, title, avatar, name, role, rating, price }) {
    return (
        <div className="course-card">
            <img src={image} alt="course" className="course-img" />
            <div className="class-content">
                <h6 className="title">{title}</h6>
                <div className="avatar">
                    <img src={avatar} alt="avatar" className="avatar-img" />
                    <div className="avatar-info">
                        <div className="name">{name}</div>
                        <div className="role">{role}</div>
                    </div>
                </div>
                <div className="rating-price">
                    <div className="rating">
                        <span className="star">★★★☆☆</span>
                        <span className="rating">{rating}</span>
                    </div>
                    <div className="price">{price}</div>
                </div>
            </div>
        </div>
    );
}

CourseCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
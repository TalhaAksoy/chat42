/*	42 İstanbul bünyesinde kullanılmak için tasarlanan mesajlaşma uygulaması
 *	Copyright (C) 2022 42 İstanbul
 *
 *	This program is free software: you can redistribute it and/or modify
 *	it under the terms of the GNU General Public License as published by
 *	the Free Software Foundation, either version 3 of the License, or
 *	(at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU General Public License
 *	along with this program.  If not, see <https://www.gnu.org/licenses/>.	
*/

import React, { Component }	from "react";
import Carousel				from "react-multi-carousel";
import $					from "jquery";
import styles				from "../styles/contacts.module.css";
import						"react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export default class Contacts extends Component
{
	isActive(slideid)
	{
		var i = 0;
		var elements = document.getElementsByClassName(styles['isActive']);
		if (elements[i])
			elements[i++].classList.remove(styles['isActive']);
		$(slideid).toggleClass(styles['isActive']);
	}
	middle(id)
	{
		//this.Carousel.focusOnSelect;
		if((id - 2) < 0)
			id = this.state.contacts.length + (id - 2);
		else
			id = id - 2;
		this.Carousel.goToSlide(id + 10);
	}

	render()
	{
		return (
			<Carousel ref={(el) => (this.Carousel = el)}
				swipeable
				draggable
				showDots={false}
				responsive={responsive}
				infinite={true}
				autoplay={false}
				keyBoardControl={true}
				customTransition="ease-in-out"
				transitionDuration={500}
				containerClass={styles['cw']}
				removeArrowOnDeviceType={["tablet", "mobile","desktop"]}
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding-40-px"
				focusOnSelect={true}
			>
				{
					
				}
			</Carousel>
		);
	}
}
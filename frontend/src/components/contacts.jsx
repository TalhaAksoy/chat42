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
import						"react-multi-carousel/lib/styles.css";
import styles 				from '../styles/contacts.module.css';

export default class Contacts extends Component
{

	render()
	{
		return (<Carousel
			additionalTransfrom={0}
			arrows
			autoPlay={false}
			autoPlaySpeed={9999999999999}
			centerMode={true}
			className=""
			containerClass="container-with-dots"
			dotListClass=""
			draggable={false}
			focusOnSelect={false}
			infinite
			itemClass=""
			keyBoardControl
			minimumTouchDrag={80}
			renderButtonGroupOutside={false}
			renderDotsOutside={false}
			responsive={{
			  desktop: {
				breakpoint: {
				  max: 3000,
				  min: 1024
				},
				items: 8,
				partialVisibilityGutter: 40
			  },
			  mobile: {
				breakpoint: {
				  max: 464,
				  min: 0
				},
				items: 1,
				partialVisibilityGutter: 30
			  },
			  tablet: {
				breakpoint: {
				  max: 1024,
				  min: 464
				},
				items: 2,
				partialVisibilityGutter: 30
			  }
			}}
			showDots={false}
			sliderClass=""
			slidesToSlide={1}
			swipeable
		  >
			<div className={styles.contacts + " bg-red-500"}>
				<img src ="https://cdn.intra.42.fr/users/fbulut.jpg" alt = "pp"/>
			</div>
			<div className={styles.contacts + " bg-red-500"}>
				<img src ="https://cdn.intra.42.fr/users/saksoy.jpg" alt = "pp"/>
			</div>
			<div className={styles.contacts + " bg-red-500"}>
				<img src ="https://cdn.intra.42.fr/users/mkaramuk.jpg" alt = "pp"/>
			</div>
			<div className={styles.contacts + " bg-red-500"}>
				<img src ="https://cdn.intra.42.fr/users/egun.jpg" alt = "pp"/>
			</div>
			<div className={styles.contacts + " bg-red-500"}>
				<img src ="https://cdn.intra.42.fr/users/fbulut.jpg" alt = "pp"/>
			</div>
			<div className={styles.contacts + " bg-red-500"}>
				<img src ="https://cdn.intra.42.fr/users/ooz.jpg" alt = "pp"/>
			</div>
			<div className={styles.contacts + " bg-red-500"}>
				<img src ="https://cdn.intra.42.fr/users/fbulut.jpg" alt = "pp"/>
			</div>
			<div className={styles.contacts + " bg-red-500"}>
				<img src ="https://cdn.intra.42.fr/users/fbulut.jpg" alt = "pp"/>
			</div>
			<div className={styles.contacts + " bg-red-500"}>
				<img src ="https://cdn.intra.42.fr/users/fbulut.jpg" alt = "pp"/>
			</div>
		  </Carousel>);
	}
}
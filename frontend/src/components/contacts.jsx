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

export default class Contacts extends Component
{

	render()
	{
		return (<Carousel
			additionalTransfrom={0}
			arrows
			autoPlaySpeed={9999}
			centerMode={true}
			className=""
			containerClass="container-with-dots"
			dotListClass=""
			draggable
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
			<div className="w-20 h-20 bg-red-500">1</div>
			<div className="w-20 h-20 bg-red-500">2</div>
			<div className="w-20 h-20 bg-red-500">3</div>
			<div className="w-20 h-20 bg-red-500">4</div>
			<div className="w-20 h-20 bg-red-500">5</div>
			<div className="w-20 h-20 bg-red-500">6</div>
			<div className="w-20 h-20 bg-red-500">7</div>
			<div className="w-20 h-20 bg-red-500">8</div>
			<div className="w-20 h-20 bg-red-500">9</div>
			<div className="w-20 h-20 bg-red-500">10</div>
			<div className="w-20 h-20 bg-red-500">11</div>
			<div className="w-20 h-20 bg-red-500">12</div>
			<div className="w-20 h-20 bg-red-500">13</div>
			<div className="w-20 h-20 bg-red-500">14</div>
			<div className="w-20 h-20 bg-red-500">15</div>
			<div className="w-20 h-20 bg-red-500">16</div>
			<div className="w-20 h-20 bg-red-500">17</div>
			<div className="w-20 h-20 bg-red-500">18</div>
			<div className="w-20 h-20 bg-red-500">19</div>
			<div className="w-20 h-20 bg-red-500">20</div>
			<div className="w-20 h-20 bg-red-500">21</div>
			<div className="w-20 h-20 bg-red-500">22</div>
			<div className="w-20 h-20 bg-red-500">23</div>
			<div className="w-20 h-20 bg-red-500">24</div>
			<div className="w-20 h-20 bg-red-500">25</div>
			<div className="w-20 h-20 bg-red-500">26</div>
			<div className="w-20 h-20 bg-red-500">27</div>
			<div className="w-20 h-20 bg-red-500">28</div>
		  </Carousel>);
	}
}
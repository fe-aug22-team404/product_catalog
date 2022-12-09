import { FC, useEffect, useRef } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { MainImage } from '../MainImage';
import PhoneDescr from '../../../types/PhoneDescription';


type Props = {
	currentImage: number,
	handleImageChange: (index: number) => void,
	phoneData: PhoneDescr,
};

export const ItemSwiper: FC<Props> = ({
	currentImage, handleImageChange, phoneData
}) => {
	const swiperRef = useRef<SwiperRef>(null);

	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slideTo(currentImage, 500);
		}
	}, [currentImage]);

	return (
		<Swiper
			initialSlide={currentImage}
			spaceBetween={0}
			slidesPerView={1}
			scrollbar={{ draggable: true }}
			onSlideChange={(swiper) => handleImageChange(swiper.activeIndex)}
			onSwiper={(swiper) => handleImageChange(swiper.activeIndex)}
			ref={swiperRef}
		>
			{phoneData.images.map((image) => {
				return (<SwiperSlide key={image}>
							<MainImage
								altName={phoneData.name}
								imageLink={image}
							/>
					</SwiperSlide>)
			})}
		</Swiper>
	)
}

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/svg" href="/img/logo/deal1.svg" />

				{/* SEO */}
				<meta name="keyword" content={'carsaleon.uz, carsaleon, automobile, car, cars, sell car, buy car, sell buy cars, car service, car dealership'} />
				<meta
					name={'description'}
					content={
						'Buy and sell cars anywhere anytime in South Korea. Best cars at best prices on CarSaleOn Website | ' +
						'Покупайте и продавайте автомобили в любой точке Южной Кореи в любое время. Лучшие автомобили по лучшим ценам на CarSaleOn Website | ' +
						'대한민국 언제 어디서나 자동차를 사고팔 수 있습니다. CarSaleOn Website에서 최적의 가격으로 최고의 자동차를 만나보세요'
					}
				/>

			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

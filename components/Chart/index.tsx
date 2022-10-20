import { BarDatum, BarLegendProps, ResponsiveBar } from '@nivo/bar';
import React, { useEffect, useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import styles from './Chart.module.scss';
interface ChartProps {
	data: BarDatum[];
	columns: string[];
	colors: string[];
	legendNameBottom: string;
	legendNameLeft: string;
	title: string;
}

type Legends = BarLegendProps[] | undefined

const Chart: React.FC<ChartProps> = ({
	data,
	columns,
	colors,
	legendNameBottom,
	legendNameLeft,
	title,
}) => {
	const isLg = useMediaQuery('(min-width: 992px)');
	const legends : Legends = isLg
		? [
				{
					dataFrom: 'keys',
					anchor: 'bottom',
					direction: 'row',
					justify: false,
					translateX: 70,
					translateY: 45,
					itemsSpacing: 2,
					itemWidth: 200,
					itemHeight: 10,
					itemDirection: 'left-to-right',
					itemOpacity: 0.85,
					symbolSize: 20,
					symbolShape: 'circle',
					effects: [
						{
							on: 'hover',
							style: {
								itemOpacity: 1,
							},
						},
					],
				},
		  ]
		: undefined;
	return (
		<div className={`${styles['chart-container']}`}>
			<h6 className='text-center text-lg-start'>{title}</h6>
			<ResponsiveBar
				data={data}
				keys={columns}
				innerPadding={4}
				valueFormat=" >-.2f"
				indexBy="mes"
				margin={{ top: 10, right: 10, bottom: 50, left: 10 }}
				padding={0.15}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={colors}
				enableGridY={false}
				enableLabel={false}
				borderColor={{
					from: 'color',
					modifiers: [['darker', 1.6]],
				}}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 0,
					tickPadding: 5,
					tickRotation: 0,
					legend: legendNameBottom,
					legendPosition: 'middle',
					legendOffset: 24,
				}}
				axisLeft={{
					format: (v) => {
						return <></>;
					},
					tickSize: 0,
					tickRotation: 0,
					legend: legendNameLeft,
					legendPosition: 'middle',
					legendOffset: 0,
				}}
				legends={legends}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{
					from: 'color',
					modifiers: [['darker', 1.6]],
				}}
				role="application"
				ariaLabel="Nivo Bar on Investment Profitability"
			/>
		</div>
	);
};

export default Chart;

import { BarDatum, ResponsiveBar } from '@nivo/bar';
import React from 'react';
import styles from './Chart.module.scss';
interface ChartProps {
	data: BarDatum[];
	columns: string[];
	colors: string[];
	legendNameBottom: string;
	legendNameLeft: string;
}

const Chart: React.FC<ChartProps> = ({
	data,
	columns,
	colors,
	legendNameBottom,
	legendNameLeft,
}) => {
	return (
		<div className={`${styles['chart-container']}`}>
			<ResponsiveBar
				data={data}
				keys={columns}
				innerPadding={4}
				valueFormat=" >-.2f"
				indexBy="mes"
				margin={{ top: 10, right: 10, bottom: 50, left: 10}}
				padding={0.3}
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
				legends={[
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
				]}
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

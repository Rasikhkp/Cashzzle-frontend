"use client"

import { formatToRupiah } from '@/lib/utils'
import { ResponsiveLine } from '@nivo/line'

const ChartLine = ({ data, month }: { data: any, month?: string }) => {
    return (
        <div className='w-full text-xs aspect-square'>
            <div className='text-xs text-muted-foreground text-center mt-1'>{month}</div>
            <ResponsiveLine
                data={data}
                enableSlices={"x"}
                colors={{
                    "scheme": "pastel1"
                }}
                curve='basis'
                margin={{ top: 10, right: 5, bottom: 60, left: 5 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                yFormat={(value: any) => formatToRupiah(value)}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickRotation: !month ? 90 : 0
                }}
                axisLeft={null}
                enablePoints={false}
                pointSize={10}
                enableGridX={false}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointLabelYOffset={-12}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 60,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    }
                ]}
            />
        </div>
    )
}

export default ChartLine

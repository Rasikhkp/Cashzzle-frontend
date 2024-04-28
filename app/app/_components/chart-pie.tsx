"use client"

import React from 'react'
import { ResponsivePie } from "@nivo/pie"
import { formatToRupiah } from '@/lib/utils'

const ChartPie = ({ data, label, className }: any) => {
    return (
        <div className={`${className} w-full text-xs aspect-square border border-border rounded-xl`}>
            <div className='text-xs text-muted-foreground text-center mt-1'>{label}</div>
            <ResponsivePie
                data={data}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                innerRadius={0.5}
                colors={{
                    "scheme": "pastel1"
                }}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                valueFormat={(value: any) => formatToRupiah(value)}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                enableArcLinkLabels={false}
                enableArcLabels={false}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
            // legends={[
            //     {
            //         anchor: 'bottom',
            //         direction: 'column',
            //         justify: false,
            //         translateX: 0,
            //         translateY: 0,
            //         itemsSpacing: 3,
            //         itemWidth: 100,
            //         itemHeight: 18,
            //         itemTextColor: '#999',
            //         itemDirection: 'left-to-right',
            //         itemOpacity: 1,
            //         symbolSize: 14,
            //         symbolShape: 'circle',
            //         effects: [
            //             {
            //                 on: 'hover',
            //                 style: {
            //                     itemTextColor: '#000'
            //                 }
            //             }
            //         ]
            //     }
            // ]}
            />
        </div>

    )
}

export default ChartPie

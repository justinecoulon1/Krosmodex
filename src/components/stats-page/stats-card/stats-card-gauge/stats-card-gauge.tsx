import { Gauge, gaugeClasses, GaugeContainer } from '@mui/x-charts';

export function StatsCardGauge({ value }: { value: number }) {
    return (
        <GaugeContainer width={30} height={30}>
            <Gauge
                value={value}
                text={''}
                innerRadius="50%"
                cornerRadius="30%"
                sx={() => ({
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: '#ffa500',
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: '#ffffff',
                    },
                })}
            />
        </GaugeContainer>
    );
}

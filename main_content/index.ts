import { FeaturesData } from "../interfaces";
import { SiJavascript } from 'react-icons/si';

export const content: FeaturesData[] = [{
    title: 'skills',
    features: [
        {
            name: 'JavaScript / TypeScript',
            icon: SiJavascript,
            iconBg: ['yellow.100', 'yellow.900'],
            desc: 'This is something that I learned while making BSL Student Tables, checkout the projects section',
            roundness: 'sm',
        },
    ]
}];
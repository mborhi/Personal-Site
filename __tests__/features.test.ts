import { IconType } from "react-icons/lib";
import { SiJavascript } from "react-icons/si";
import { FeaturesData } from "../interfaces";
import { parseFeatures } from "../utils/features";

describe("Parse features", () => {
    it('correctly returns a FeaturesData object from string', () => {
        const text = "title: Title\nname: MockName\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\
        \nroundness: sm";
        const expected: FeaturesData[] = [{
            title: "Title",
            features: [{
                name: "MockName",
                icon: SiJavascript,
                iconBg: ["yellow.100", "yellow.900"],
                desc: "This is a mock feature.",
                roundness: "sm"
            }]
        }];
        const parsedFeaturesInfo = parseFeatures(text);

        expect(parsedFeaturesInfo).toEqual(expected);
    });

    it('correctly returns a FeaturesData object from string omitting roundness', () => {
        const text = "title: Title\nname: MockName\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\
        \nroundness: ";
        const expected: FeaturesData[] = [{
            title: "Title",
            features: [{
                name: "MockName",
                icon: SiJavascript,
                iconBg: ["yellow.100", "yellow.900"],
                desc: "This is a mock feature."
            }]
        }];
        const parsedFeaturesInfo = parseFeatures(text);
        expect(parsedFeaturesInfo).toEqual(expected);
    });

    it('correctly returns a FeaturesData object from with multiple FeatureInfo', () => {
        const text = "title: Title\nname: MockName\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\
        \nroundness: \n\ntitle: TitleTwonname: Mock\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is another mock feature.\
        \nroundness: md";
        const expected: FeaturesData[] = [{
            title: "Title",
            features: [{
                name: "MockName",
                icon: SiJavascript,
                iconBg: ["yellow.100", "yellow.900"],
                desc: "This is a mock feature."
            }]
        }];
        const parsedFeaturesInfo = parseFeatures(text);
        expect(parsedFeaturesInfo).toEqual(expected);
    });

    it('correctly catches an error when property of FeaturesData is omitted from the string', () => {
        const text = "title: Title\nname: MockName\nicon: SiJavascript\niconBg: yellow.100, yellow.900\nroundness: ";
        const expected: FeaturesData[] = [];
        const parsedFeaturesInfo = parseFeatures(text);
        expect(parsedFeaturesInfo).toEqual(expected);
    });
});
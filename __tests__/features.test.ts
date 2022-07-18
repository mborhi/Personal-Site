import { IconType } from "react-icons/lib";
import { SiJavascript } from "react-icons/si";
import { FeatureInfo, FeaturesData } from "../interfaces";
import { getMatches, parseFeatures, parseFeaturesData, parseFeaturesDataList } from "../utils/features";

describe("Parse features data", () => {
    it('correctly returns a FeaturesData object from string', () => {
        const text = "title: Title\nfeatures:\nname: MockName\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\
        \nroundness: sm";
        const expectedFeaturesData: FeaturesData = {
            title: "Title",
            features: [{
                name: "MockName",
                icon: "SiJavascript",
                iconBg: ["yellow.100", "yellow.900"],
                desc: "This is a mock feature.",
                roundness: "sm"
            }]
        };
        const expected = {
            "contents": "",
            "info": expectedFeaturesData
        }
        const parsedFeaturesInfo = parseFeaturesData(text);

        expect(parsedFeaturesInfo).toEqual(expected);
    });

    it('correctly returns a FeaturesData list from string', () => {
        const text = "title: Title\nfeatures:\nname: MockName\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\
        \nroundness: md";
        const expected: FeaturesData[] = [{
            title: "Title",
            features: [{
                name: "MockName",
                icon: "SiJavascript",
                iconBg: ["yellow.100", "yellow.900"],
                desc: "This is a mock feature.",
                roundness: "md"
            }]
        }];
        const parsedFeaturesInfo = parseFeaturesDataList(text);
        expect(parsedFeaturesInfo).toEqual(expected);
    });

    it('correctly returns a FeaturesData object from with multiple FeatureInfo', () => {
        const text = "title: Title\nfeatures:\nname: MockName\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\
        \nroundness: md\ntitle: Title\nfeatures:\nname: MockName\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\
        \nroundness: md";
        const expectedFirst: FeaturesData = {
            title: "Title",
            features: [{
                name: "MockName",
                icon: "SiJavascript",
                iconBg: ["yellow.100", "yellow.900"],
                desc: "This is a mock feature.",
                roundness: "md"
            }]
        };
        const expected: FeaturesData[] = [expectedFirst, expectedFirst];
        const parsedFeaturesData = parseFeaturesDataList(text);
        expect(parsedFeaturesData).toEqual(expected);
    });

    // it('correctly catches an error when property of FeaturesData is omitted from the string', () => {
    //     const text = "title: Title\nname: MockName\nicon: SiJavascript\niconBg: yellow.100, yellow.900\nroundness: ";
    //     const expected: FeaturesData[] = [];
    //     const parsedFeaturesInfo = parseFeaturesData(text);
    //     expect(parsedFeaturesInfo).toEqual(expected);
    // });
});

describe("parse features", () => {
    console.log('running describe parse test');
    const featureRE = /.*/;
    it('correctly gets match', () => {
        const text = "abc";
        const match = getMatches(text, featureRE);
        expect(match).toEqual("abc");
    });

    it('correctly reads in name line', () => {
        let contents = "name: abc";
        // cut off 'name: '
        contents = contents.substring(6);
        // get the name and assign it
        let name: string = getMatches(contents, featureRE);
        expect(name).toEqual("abc");
        contents = contents.substring(name.length);
        expect(contents).toEqual("");

    });
    it("correctly parses features", () => {
        console.log('running it parse test');
        const text = "name: MockName\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\nroundness: sm";
        const expectedInfo: FeatureInfo = {
            name: "MockName",
            icon: "SiJavascript",
            iconBg: ["yellow.100", "yellow.900"],
            desc: "This is a mock feature.",
            roundness: "sm"
        };
        const expected = {
            "contents": "",
            "info": expectedInfo
        };
        const parsedFeaturesInfo = parseFeatures(text);
        expect(parsedFeaturesInfo).toEqual(expected);
    });
});
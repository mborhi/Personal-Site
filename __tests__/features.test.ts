import { IconType } from "react-icons/lib";
import { SiJavascript } from "react-icons/si";
import { FeatureInfo, FeaturesData } from "../interfaces";
import { getFirstMatch, loadFeaturesFromFile, parseFeatures, parseFeaturesData, parseFeaturesDataList } from "../utils/features";

describe("Parse features data", () => {
    it('correctly returns a FeaturesData object from string', () => {
        const text = "title: Title\nfeatures:\nname: MockName\ncolor: yellow.500\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\
        \nroundness: sm";
        const expectedFeaturesData: FeaturesData = {
            title: "Title",
            features: [{
                name: "MockName",
                color: "yellow.500",
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
        const text = "title: Title\nfeatures:\nname: MockName\ncolor: yellow.500\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\
        \nroundness: md";
        const expected: FeaturesData[] = [{
            title: "Title",
            features: [{
                name: "MockName",
                color: "yellow.500",
                icon: "SiJavascript",
                iconBg: ["yellow.100", "yellow.900"],
                desc: "This is a mock feature.",
                roundness: "md"
            }]
        }];
        const parsedFeaturesInfo = parseFeaturesDataList(text);
        expect(parsedFeaturesInfo).toEqual(expected);
    });

    it('correctly returns a FeaturesData list from text with multiple FeatureData', () => {
        const text = "title: Title\nfeatures:\nname: MockName\ncolor: yellow.500\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\
        \nroundness: md\ntitle: Title2\nfeatures:\nname: MockName\ncolor: yellow.500\nicon: SiJavascript\niconBg: yellow.100, yellow.900\ndesc: This is a mock feature.\
        \nroundness: md";
        const expectedFirst: FeaturesData = {
            title: "Title",
            features: [{
                name: "MockName",
                color: "yellow.500",
                icon: "SiJavascript",
                iconBg: ["yellow.100", "yellow.900"],
                desc: "This is a mock feature.",
                roundness: "md"
            }]
        };
        const expected: FeaturesData[] = [expectedFirst, { ...expectedFirst, "title": "Title2" }];
        const parsedFeaturesData = parseFeaturesDataList(text);
        expect(parsedFeaturesData).toEqual(expected);
    });

    it('correctly returns a FeaturesData object from text with multiple FeaturesInfo', () => {
        const text = "title: SKILLS\nfeatures:\nname: JavaScript / TypeScript\ncolor: yellow.500\nicon: SiJavascript\niconBg: yellow.200, yellow.900\ndesc: This was used to develop this site, my Spotify DiscoverEase app, and BSL Tables. Check them out in the projects section.\
        \nroundness: sm\nfeatures:\nname: Java\ncolor: blue.400\nicon: SiJava\niconBg: gray.100, gray.700\ndesc: I used Java to develop my very simple Ray Tracer, as well as in my courses: Software Systems, Data Structures\
        \nroundness: full";
        const expected: FeaturesData[] = [{
            title: "SKILLS",
            features: [
                {
                    name: "JavaScript / TypeScript",
                    color: "yellow.500",
                    icon: "SiJavascript",
                    iconBg: ["yellow.200", "yellow.900"],
                    desc: "This was used to develop this site, my Spotify DiscoverEase app, and BSL Tables. Check them out in the projects section.",
                    roundness: "sm"
                },
                {
                    name: "Java",
                    color: "blue.400",
                    icon: "SiJava",
                    iconBg: ["gray.100", "gray.700"],
                    desc: "I used Java to develop my very simple Ray Tracer, as well as in my courses: Software Systems, Data Structures",
                    roundness: "full"
                }
            ]
        }];
        const parsedFeaturesData = parseFeaturesDataList(text);
        expect(parsedFeaturesData).toEqual(expected);
    });

    it('correctly returns FeaturesData from text with tab characters', () => {
        const text = "title: Title\nfeatures:\n\tname: MockName\n\tcolor: yellow.500\n\ticon: SiJavascript\n\ticonBg: yellow.100, yellow.900\n\tdesc: This is a mock feature.\
        \n\troundness: sm";
        const expectedFeaturesData: FeaturesData = {
            title: "Title",
            features: [{
                name: "MockName",
                color: "yellow.500",
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

    // it('correctly catches an error when property of FeaturesData is omitted from the string', () => {
    //     const text = "title: Title\nname: MockName\nicon: SiJavascript\niconBg: yellow.100, yellow.900\nroundness: ";
    //     const expected: FeaturesData[] = [];
    //     const parsedFeaturesInfo = parseFeaturesData(text);
    //     expect(parsedFeaturesInfo).toEqual(expected);
    // });
});

describe("Parse FeatureInfo", () => {
    const featureRE = /.*/;

    it('correctly reads in name line', () => {
        let contents = "name: abc";
        // cut off 'name: '
        contents = contents.substring(6);
        // get the name and assign it
        let name: string = getFirstMatch(contents, featureRE);
        expect(name).toEqual("abc");
        contents = contents.substring(name.length);
        expect(contents).toEqual("");

    });

    it("correctly parses features", () => {
        const text = "name: MockName\ncolor: yellow.500\nicon: SiJavascript\niconBg: yellow.100, \
        yellow.900\ndesc: This is a mock feature.\nroundness: sm";
        const expectedInfo: FeatureInfo = {
            name: "MockName",
            color: "yellow.500",
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

    it("correctly parses features from text with tab characters", () => {
        const text = "\tname: MockName\n\tcolor: yellow.500\n\ticon: SiJavascript\n\ticonBg: yellow.100, \
        yellow.900\n\tdesc: This is a mock feature.\n\troundness: sm";
        const expectedInfo: FeatureInfo = {
            name: "MockName",
            color: "yellow.500",
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

describe("load features from file", () => {
    it("correctly loads FeautreData[] from file containing one FeatureData entry", () => {
        const expected = [{
            title: "SKILLS",
            features: [
                {
                    name: "JavaScript / TypeScript",
                    color: "yellow.400",
                    icon: "SiJavascript",
                    iconBg: ["yellow.200", "yellow.900"],
                    desc: "This was used to develop this site, my Spotify DiscoverEase app, and BSL Tables. Check them out in the projects section",
                    roundness: "sm"
                },
                {
                    name: "Java",
                    color: "blue.500",
                    icon: "SiJava",
                    iconBg: ["gray.100", "gray.700"],
                    desc: "I used Java to develop my very simple Ray Tracer, as well as in my courses: Software Systems, Data Structures",
                    roundness: "full"
                }
            ]
        }];
        const actual = loadFeaturesFromFile("features_test1.txt");
        expect(actual).toEqual(expected);
    });
    it("correctly loads FeautreData[] from file containing two FeatureData entries", () => {
        const expected = [
            {
                title: "SKILLS",
                features: [
                    {
                        name: "JavaScript / TypeScript",
                        color: "yellow.400",
                        icon: "SiJavascript",
                        iconBg: ["yellow.200", "yellow.900"],
                        desc: "This was used to develop this site, my Spotify DiscoverEase app, and BSL Tables. Check them out in the projects section",
                        roundness: "sm"
                    }
                ]
            },
            {
                title: "SKILLS",
                features: [
                    {
                        name: "Java",
                        color: "blue.500",
                        icon: "SiJava",
                        iconBg: ["gray.100", "gray.700"],
                        desc: "I used Java to develop my very simple Ray Tracer, as well as in my courses: Software Systems, Data Structures",
                        roundness: "full"
                    }
                ]
            }
        ];
        const actual = loadFeaturesFromFile("features_test2.txt");
        expect(actual).toEqual(expected);
    });
});

describe("Regex", () => {
    it('correctly gets match', () => {
        const featureRE = /.*/;
        const text = "abc";
        const match = getFirstMatch(text, featureRE);
        expect(match).toEqual("abc");
    });
});
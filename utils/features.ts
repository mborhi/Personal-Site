import fs from 'fs';
import path from 'path';
import { IconType } from 'react-icons/lib';
import { FeatureInfo, FeaturesData } from '../interfaces';

// regex for parsing FeaturesData
const titleRE = /^\s*title:(?=$|[\s",'`()[\]{}|;#])/;
const featuresRE = /^\s*features:(?=$|[\s",'`()[\]{}|;#])/
const nameRE = /^\s*name:(?=$|[\s",'`()[\]{}|;#])/;
const iconRE = /^\s*icon:(?=$|[\s",'`()[\]{}|;#])/;
const iconBgRE = /^\s*iconBg:(?=$|[\s",'`()[\]{}|;#])/;
const descRE = /^\s*desc:(?=$|[\s",'`()[\]{}|;#])/;
const roundnessRE = /^\s*roundness:(?=$|[\s",'`()[\]{}|;#])/;
const featureRE = /.*/;

export const loadFeaturesFromFile = (fileName: string) => {

}

export const parseFeaturesDataList = (contents: string): FeaturesData[] => {
    let featuresDataList: FeaturesData[] = [];
    while (contents.length > 0) {
        if (titleRE.test(contents)) {
            // get the FeaturesData
            let featuresData = parseFeaturesData(contents);
            console.log('features data form list parse: ', featuresData);
            featuresDataList = [...featuresDataList, featuresData.info];
            contents = featuresData.contents;
        } else {
            return featuresDataList;
        }
    }
    return featuresDataList;
}

export const parseFeaturesData = (contents: string): { "contents": string, "info": FeaturesData } => {
    // parse until everything has been parsed from the file contents
    // let featuresDataList: FeaturesData[] = [];
    let featuresData;
    let features;
    while (contents.length > 0) {
        if (titleRE.test(contents)) {
            // strip the 'title: '
            contents = contents.substring(7);
            let title = getMatches(contents, featureRE);
            parseFeatures(contents.substring(title.length));
            featuresData = { ...featuresData, "title": title.trim() };
            contents = contents.substring(title.length);

        } else if (featuresRE.test(contents)) {
            contents = contents.substring(10);
            // contents = contents.substring(getMatches(contents, featureRE).length);
            features = parseFeaturesList(contents);
            featuresData = { ...featuresData, "features": features.info };
            contents = features.contents;
            return { "contents": contents, "info": featuresData };
        } else {
            return { "contents": contents, "info": featuresData };
        }
    }
    // "SiJavascript" as unknown as IconType
    return { "contents": contents, "info": featuresData };
}

const parseFeaturesList = (contents: string): { "contents": string, "info": FeatureInfo[] } => {
    let featuresList = [];
    while (contents.length > 0) {
        if (titleRE.test(contents)) {
            return { "contents": contents, "info": featuresList };
        } else {
            let features = parseFeatures(contents);
            featuresList = [...featuresList, features.info];
            // find a way to determine the new contents
            contents = features.contents;
        }
    }
    return { "contents": contents, "info": featuresList };
}

export const parseFeatures = (contents: string): { contents: string, info: FeatureInfo } => {
    let featureInfo: FeatureInfo = {
        name: "",
        icon: "",
        iconBg: ["", ""],
        desc: "",
    };
    while (contents.length > 0) {
        if (nameRE.test(contents)) {
            // cut off 'name: '
            contents = contents.substring(6);
            // get the name and assign it
            let name: string = getMatches(contents, featureRE);
            featureInfo = { ...featureInfo, "name": name.trim() };
            contents = contents.substring(name.length);
            length -= contents.length;

        } else if (iconRE.test(contents)) {
            contents = contents.substring(6);
            let iconString = getMatches(contents, featureRE);
            let icon = iconString.trim();
            featureInfo = { ...featureInfo, "icon": icon };
            contents = contents.substring(iconString.length);
            length -= contents.length;

        } else if (iconBgRE.test(contents)) {
            contents = contents.substring(8);
            let iconBgString = getMatches(contents, featureRE);
            let iconBg: string[] = iconBgString.trim().split(',');
            iconBg = iconBg.map((color) => color.trim());
            featureInfo = { ...featureInfo, "iconBg": iconBg };
            contents = contents.substring(iconBgString.length);
            length -= contents.length;

        } else if (descRE.test(contents)) {
            contents = contents.substring(6);
            let desc: string = getMatches(contents, featureRE);
            featureInfo = { ...featureInfo, "desc": desc.trim() };
            contents = contents.substring(desc.length);
            length -= contents.length;

        } else if (roundnessRE.test(contents)) {
            contents = contents.substring(11);
            let roundness: string = getMatches(contents, featureRE);
            featureInfo = { ...featureInfo, "roundness": roundness.trim() };
            contents = contents.substring(roundness.length);
            length -= contents.length;

        } else {
            // roundness is omitted
            return { "contents": contents, "info": featureInfo };
        }
    }
    return { "contents": contents, "info": featureInfo };

}

export const getMatches = (str: string, regex: RegExp): string => {
    const matches = regex.exec(str);
    return matches[0];
}
import fs from 'fs';
import path from 'path';
import { FeatureInfo, FeaturesData } from '../interfaces';

// regex for parsing FeaturesData
const titleRE = /^\s*title:(?=$|[\s",'`()[\]{}|;#])/;
const featuresRE = /^\s*features:(?=$|[\s",'`()[\]{}|;#])/
const nameRE = /^\s*name:(?=$|[\s",'`()[\]{}|;#])/;
const colorRE = /^\s*color:(?=$|[\s",'`()[\]{}|;#])/;
const iconRE = /^\s*icon:(?=$|[\s",'`()[\]{}|;#])/;
const iconBgRE = /^\s*iconBg:(?=$|[\s",'`()[\]{}|;#])/;
const descRE = /^\s*desc:(?=$|[\s",'`()[\]{}|;#])/;
const roundnessRE = /^\s*roundness:(?=$|[\s",'`()[\]{}|;#])/;
const featureRE = /.*/;

export const loadFeaturesFromFile = (fileName: string) => {
    const featuresFile = path.join(process.cwd(), `/main_content/${fileName}`);
    const contents = fs.readFileSync(featuresFile, 'utf-8').trim();

    return parseFeaturesDataList(contents);

}

export const parseFeaturesDataList = (contents: string): FeaturesData[] => {
    let featuresDataList: FeaturesData[] = [];
    while (contents.length > 0) {
        if (titleRE.test(contents)) {
            // get the FeaturesData
            let featuresData = parseFeaturesData(contents);
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
    let featuresData;
    let features;
    while (contents.length > 0) {
        if (titleRE.test(contents)) {
            // strip the 'title: '
            contents = contents.trim().substring(6);
            let title = getFirstMatch(contents, featureRE);
            featuresData = { ...featuresData, "title": title.trim() };
            contents = contents.substring(title.length)
            // contents = contents.substring(title.length);

        } else if (featuresRE.test(contents)) {
            // trim off 'features:'
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
        } else if (featuresRE.test(contents)) {
            // remove 'features:'
            contents = contents.substring(10);
            let features = parseFeatures(contents);
            featuresList = [...featuresList, features.info];
            contents = features.contents;
        } else {
            let features = parseFeatures(contents);
            featuresList = [...featuresList, features.info];
            contents = features.contents;
        }
    }
    return { "contents": contents, "info": featuresList };
}

export const parseFeatures = (contents: string): { contents: string, info: any } => {
    let featureInfo
    while (contents.length > 0) {
        if (nameRE.test(contents)) {
            // cut off 'name: '
            contents = contents.substring(6);
            // get the name and assign it
            let name: string = getFirstMatch(contents, featureRE);
            featureInfo = { ...featureInfo, "name": name.trim() };
            contents = contents.substring(name.length);

        } else if (colorRE.test(contents)) {
            // cut off 'color: '
            contents = contents.substring(7);
            // get color and assign
            let color: string = getFirstMatch(contents, featureRE);
            featureInfo = { ...featureInfo, "color": color.trim() };
            contents = contents.substring(color.length);

        } else if (iconRE.test(contents)) {
            contents = contents.substring(6);
            let iconString = getFirstMatch(contents, featureRE);
            let icon: string = iconString.trim();
            featureInfo = { ...featureInfo, "icon": icon };
            contents = contents.substring(iconString.length);

        } else if (iconBgRE.test(contents)) {
            contents = contents.substring(8);
            let iconBgString = getFirstMatch(contents, featureRE);
            let iconBg: string[] = iconBgString.trim().split(',');
            iconBg = iconBg.map((color) => color.trim());
            featureInfo = { ...featureInfo, "iconBg": iconBg };
            contents = contents.substring(iconBgString.length);


        } else if (descRE.test(contents)) {
            contents = contents.substring(6);
            let desc: string = getFirstMatch(contents, featureRE);
            featureInfo = { ...featureInfo, "desc": desc.trim() };
            contents = contents.substring(desc.length);


        } else if (roundnessRE.test(contents)) {
            contents = contents.substring(11);
            let roundness: string = getFirstMatch(contents, featureRE);
            featureInfo = { ...featureInfo, "roundness": roundness.trim() };
            contents = contents.substring(roundness.length);


        } else {
            // roundness is omitted
            return { "contents": contents, "info": featureInfo };
        }
    }
    return { "contents": contents, "info": featureInfo };

}

/**
 * Returns the first sequence in the given string matching the regex 
 * @param str the string
 * @param regex the regex
 * @returns the first match
 */
export const getFirstMatch = (str: string, regex: RegExp): string => {
    const matches = regex.exec(str);
    return matches[0];
}
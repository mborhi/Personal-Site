import { ReactElement } from "react";
import { IconType } from "react-icons/lib";

export interface AcademicData {
    course: string
    name: string
    grade: string
    isMajor: boolean
}

export interface AcademicRecord {
    title: string
    data: AcademicData[]
}

export interface FeatureInfo {
    name: string
    icon: string
    iconBg: string[]
    desc: string
    roundness?: string
}

export interface FeaturesData {
    title: string
    features: FeatureInfo[]
}
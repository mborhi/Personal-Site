import { ReactElement } from "react";

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
    icon: ReactElement
    iconBg: string[]
    desc: string
    roundness?: string
}

export interface FeaturesData {
    title: string
    features: FeatureInfo[]
}
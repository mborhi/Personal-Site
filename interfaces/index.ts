// academic record filtering
export interface FilterOption {
    name: string
    value: (a: AcademicData) => boolean
}

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

// main content parsing
export interface FeatureInfo {
    name: string
    color: string
    icon: string
    iconBg: string[]
    desc: string
    roundness?: string
}

export interface FeaturesData {
    title: string
    features: FeatureInfo[]
}

// projects content parsing
export interface ProjectData {
    id: string
    name: string
    date: string
    tech: string
    image: string
    desc: string
    content: string
}
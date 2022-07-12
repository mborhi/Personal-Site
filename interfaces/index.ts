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
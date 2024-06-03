import * as XLSX from "xlsx";
import { StudentsInCourse } from "../../types/Course";

export async function ReadFile(file: File) {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: "",
  });

  return jsonData;
}

export function ConvertToStudentsInCourse(data: any) {
  let result = new Array<StudentsInCourse>();
  for (let value of data) {
    result.push({
      id: value[0] as number,
      roleNumber: value[1] as string,
    });
  }

  return result;
}

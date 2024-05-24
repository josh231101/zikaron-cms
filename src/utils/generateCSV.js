import moment from 'moment'
import * as xlsx from 'xlsx';


// eslint-disable-next-line import/no-anonymous-default-export
const generateCSV = (data = [], fileName = '', sheetName = 'Sheet 1', includeDate = true) => {
  const currentSheetName = sheetName.length > 31 ? sheetName.substring(0, 31) : sheetName
  const workbook = xlsx.utils.book_new()
  const sh = xlsx.utils.json_to_sheet(data, { skipHeader: true })
  xlsx.utils.book_append_sheet(workbook, sh, currentSheetName)
  const date = moment().format('YYYYMMDD')
  const completeFileName = `${fileName}${includeDate ? `-${date}` : ''}.xlsx`
  xlsx.writeFile(workbook, completeFileName)

}

export default generateCSV
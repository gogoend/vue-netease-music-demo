export const downloadBlob = function (blob: Blob | File, fileName: string) {
    const tempUrl = URL.createObjectURL(blob)
    const aEl = document.createElement('a')
    aEl.href = tempUrl;
    aEl.setAttribute("download", fileName)
    document.body.append(aEl)
    aEl.click()
    aEl.remove()
    URL.revokeObjectURL(tempUrl)
}
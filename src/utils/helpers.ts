export function getRouteFromFileName(file: string, base: string) {
    let path = file.replace(base, "")

    // remove extension if present
    if (/.[t|j]s$/.test(path)) {
        path = path.slice(0, -3)
    }

    // check if filename is index
    if (/index$/.test(path)) {
        path = path.slice(0, -5)
    }

    return path || "/"
}


export const getLink = (loc, defaultLink) => {
        if (loc.pathname !== '/') {
            return '.'
        }
        return defaultLink
    }
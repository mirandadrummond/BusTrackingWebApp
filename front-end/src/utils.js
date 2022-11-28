

export const getLink = (loc, defaultLink) => {
        if (loc.pathname !== '/') {// if (location.pathname !== '/') {
            return '.'
        }
        return defaultLink
    }
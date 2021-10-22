const useTerm = (createdAt) => {
    const gap = Date.now() - createdAt;
    const MILLISECOND_PER_MINUTE = 60000;
    const MILLISECOND_PER_HOUR = MILLISECOND_PER_MINUTE * 60;
    const MILLISECOND_PER_DAY = MILLISECOND_PER_HOUR * 24;
    const MILLISECOND_PER_WEEK = MILLISECOND_PER_DAY * 7;

    if (gap >= MILLISECOND_PER_WEEK) {
        if (Math.floor(gap / MILLISECOND_PER_WEEK) === 1) return `1 week ago`;
        return `${Math.floor(gap / MILLISECOND_PER_WEEK)} weeks ago`;
    } else if (gap >= MILLISECOND_PER_DAY) {
        if (Math.floor(gap / MILLISECOND_PER_DAY) === 1) return `1 day ago`;
        return `${Math.floor(gap / MILLISECOND_PER_DAY)} days ago`;
    } else if (gap >= MILLISECOND_PER_HOUR) {
        if (Math.floor(gap / MILLISECOND_PER_HOUR) === 1) return `1 hour ago`;
        return `${Math.floor(gap / MILLISECOND_PER_HOUR)} hours ago`;
    } else if (gap >= MILLISECOND_PER_MINUTE) {
        if (Math.floor(gap / MILLISECOND_PER_MINUTE) === 1)
            return `1 minute ago`;
        return `${Math.floor(gap / MILLISECOND_PER_MINUTE)} minutes ago`;
    } else {
        return `just before`;
    }
};

export default useTerm;

const useTerm = (createdAt) => {
    const gap = Date.now() - createdAt;
    const MILLISECOND_PER_MINUTE = 60000;
    const MILLISECOND_PER_HOUR = MILLISECOND_PER_MINUTE * 60;
    const MILLISECOND_PER_DAY = MILLISECOND_PER_HOUR * 24;
    const MILLISECOND_PER_WEEK = MILLISECOND_PER_DAY * 7;

    if (gap >= MILLISECOND_PER_WEEK) {
        return `${Math.floor(gap / MILLISECOND_PER_WEEK)} weeks ago`;
    } else if (gap >= MILLISECOND_PER_DAY) {
        return `${Math.floor(gap / MILLISECOND_PER_DAY)} days ago`;
    } else if (gap >= MILLISECOND_PER_HOUR) {
        return `${Math.floor(gap / MILLISECOND_PER_HOUR)} hours ago`;
    } else {
        return `${Math.floor(gap / MILLISECOND_PER_MINUTE)} minutes ago`;
    }
};

export default useTerm;

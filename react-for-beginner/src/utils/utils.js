export const testCall = () => {
    return 'TEST';
};

/**
 * 타임아웃 인스턴스 정보
 * @returns - 타임아웃 인스턴스별 번호 정보(key-value형태로 저장)
 */
export const timeoutInstcs = () => {
    return {};
};

/**
 * 타임아웃 인스턴스 clear
 * @param {string} target - 타겟 인스턴스 명
 */
export const clearTimeoutInstcs = (target) => {
    if(!!timeoutInstcs[target]) {
      clearTimeout(timeoutInstcs[target]);
      timeoutInstcs[target] = null;
    }
};
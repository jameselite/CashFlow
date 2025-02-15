export function NowTime(): string {

    const year: any = new Date().getFullYear();
    const month: any = new Date().getMonth();
    const day: any = new Date().getDay();

    return `${year}-${month}-${day}`;
    
}
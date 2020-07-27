export class ChartItem{
    id;
    content;
    editing;

    constructor(item){
        this.id = item.id;
        this.content = item.content;
        this.editing = false;

    }
}

export default ChartItem;
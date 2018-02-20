class Sorter {
    constructor() {
        this.elements = [];
        this.compare = function compareNumeric(a, b) {
            return a - b;
        };
    }

    add(element) {
        // remove duplicate items
        if (typeof (element) == 'string' || 'symbol') {
            this.elements.push(element);
        } else {

            let store = {}; // объект для коллекции
            let itemsLength = element.length || 1; //количество переданных элементов в масииве или 1 если это не массив

            for (let i = 0; i < itemsLength; i++) {
                let key = element[i] || element; // для каждого элемента создаём свойство
                store[key] = key;
            }

            if (this.elements.length == 0) {                    // Если элементов нету вообще,
                this.elements = this.elements.concat(element);    // то добавить переданное в функции значение сразу.
            } else {
                for (var i = 0; i < this.elements.length; i++) {
                    if (toString.call(this.elements[i]) == '[object Object]') { // Если переданный элемент объект, то не проверять
                        break;                                                    // на повторы.
                    }
                    if (store[this.elements[i]] && (typeof(store[this.elements[i]]) == typeof(this.elements[i]))) {   // Если новй переданный элемент уже имеется в массиве, то
                        delete store[this.elements[i]]   // то удалить переданного.
                    }
                }
                for (let key in store) {     // Записать в массив все элементы,очищенные выше от повторений.
                    this.elements.push(store[key])
                }
            }
        }
    }

    at(index) {
        return this.elements[index];
    }

    get length() {
        return this.elements.length;
    }

    toArray() {
        return this.elements;
    }

    sort(indices) {

        let arraySort = []; //массив сортируемых элеметов
        for (var i = 0; i < indices.length; i++) {
            arraySort.push(this.elements[indices[i]])  // взять из первоначального сортируемого массива элементы с требуемыми индексами
        }                                   // и дабавить их во временный массив 'arraySort'

        arraySort.sort(this.compare); //отсортировать временный массив
        indices.sort(compareNumericDefault);   //отсортировать индексы

        function compareNumericDefault(a, b) {  //Сортировка по умолчанию для индексов.
            return a - b;
        };

        for (var i = 0; i < indices.length; i++) {
            this.elements.splice(indices[i], 1, arraySort[i])
        };

    }

    setComparator(compareFunction) {
        this.compare = compareFunction;
    }
}
module.exports = Sorter;
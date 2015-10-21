describe("NodeList", function () {

    var $$ = window.$$;
    if (!$$)
        $$ = require("nodelist");

    var fixture = document.createDocumentFragment();

    var groups = [], i;
    for (i = 0; i < 3; ++i) {
        var group = document.createElement("div");
        group.className = ["group", "group_" + i].join(" ");
        groups[i] = group;
        fixture.appendChild(group);
    }

    var items = [];
    for (i = 0; i < 10; ++i) {
        var item = document.createElement("span");
        item.className = [
            "item",
            "item_" + i
        ].join(" ");
        item.appendChild(document.createTextNode("item " + i));
        items[i] = item;
        groups[i % 3].appendChild(item);
    }

    function sortSelectionArray(arr) {
        var matchIndex = function (node) {
            return Number(node.className.match(/_(\d+)/)[1]);
        };
        arr.sort(function (a, b) {
            return matchIndex(a) - matchIndex(b);
        });
        return arr;
    }

    document.body.appendChild(fixture);

    describe("$$", function () {

        it("should select elements using css selectors and return them in a new NodeList instance", function () {
            expect($$("div.group").length).toBe(groups.length);
            expect($$("span.item").length).toBe(items.length);
            expect($$("div.group_0 span.item").length).toBe(Math.ceil(items.length / groups.length));
            expect($$("div.group_1 span.item_1").length).toBe(1);
        });
    });

    describe("NodeList instance", function () {

        describe("children property", function () {

            it("should select and flatten children of the selected elements", function () {
                var itemsSelection = $$("div.group").children.asArray;
                expect(sortSelectionArray(itemsSelection)).toEqual(items);
            });
        });

        describe("attribute properties like tagName and className", function () {

            it("should return arrays of attributes of the selected elements", function () {
                var groupTags = $$("div.group").tagName;
                for (var i = 0; i < groupTags.length; ++i)
                    expect(groupTags[i].toLowerCase()).toBe("div");
            });

            it("should set attributes on the selected elements", function () {
                $$("div.group").className = "test";
                for (var i = 0; i < groups.length; ++i)
                    expect(groups[i].className).toBe("test");
            });
        });

        describe("addEventListener", function () {

            it("should be add event listener to the selected nodes", function () {

                var log = [];
                var listener = jasmine.createSpy().and.callFake(function () {
                    log.push(this);
                });
                $$("span.item").addEventListener("click", listener);
                $$("span.item").click();
                expect(listener.calls.count()).toBe(items.length);
                expect(sortSelectionArray(log)).toEqual(items);
            });
        });

        describe("remove method", function () {

            it("should remove selected elements from the DOM tree", function () {

                $$("span.item_0, span.item_1").remove();
                expect($$("span.item").length).toBe(items.length - 2);
            });
        });
    });

});
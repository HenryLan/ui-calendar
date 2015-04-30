(function () {
    var app = angular.module('demoApp');
   
    var calendarCtrl = function ($scope, $compile, $location, $anchorScroll, uiCalendarConfig) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };
        /* event source that contains custom events on the scope */
        $scope.events = [
          { id: 10, title: 'Performance Review', start: new Date(y, m, 1, 10, 0), start: new Date(y, m, 1, 11, 0), allDay: false },
          { id: 15, title: 'Birthday Party', start: new Date(y, m, d + 1, 14, 0), end: new Date(y, m, d + 1, 17, 30), allDay: false },
          { title: 'Meeting with Lawyer', start: new Date(y, m, 28, 9, 0), end: new Date(y, m, 28, 10, 0), allday: false}
        ];
        /* event source that calls a function on every view switch */
        //$scope.eventsF = function (start, end, timezone, callback) {
        //    var s = new Date(start).getTime() / 1000;
        //    var e = new Date(end).getTime() / 1000;
        //    var m = new Date(start).getMonth();
        //    var events = [{ title: 'Feed Me ' + m, start: s + (50000), end: s + (100000), allDay: false, className: ['customFeed'] }];
        //    callback(events);
        //};

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
               { type: 'party', title: 'Lunch', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
            ]
        };
        /* alert on eventClick */
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            //$scope.alertMessage = (date.title + ' was clicked ');            

            getAgenda();


        };
        /* alert on Drop */
        $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function (sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function (value, key) {
                if (sources[key] === source) {
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if (canAdd === 0) {
                sources.push(source);
            }
        };
        /* add custom event*/
        $scope.addEvent = function () {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };
        /* remove event */
        $scope.remove = function (index) {
            $scope.events.splice(index, 1);
        };
        /* Change View */
        $scope.changeView = function (view, calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        };
        /* Change View */
        $scope.renderCalender = function (calendar) {
            if (uiCalendarConfig.calendars[calendar]) {
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };
        /* Render Tooltip */
        $scope.eventRender = function (event, element, view) {
            element.attr({
                'tooltip': event.title,
                'tooltip-append-to-body': true
            });
            $compile(element)($scope);
        };
        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                header: {
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };

        $scope.changeLang = function () {
            if ($scope.changeTo === 'Hungarian') {
                $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                $scope.changeTo = 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Hungarian';
            }
        };
        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.calEventsExt];
        //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];


        $scope.agenda = [];

        activate();

        function activate() {
            getMeetingInfo();

        };

        function getMeetingInfo() {
            //alert('ok');
        };

        function getAgenda() {
            clearAgenda();
            var agenda1 = { title: "Review Agenda", order: 1, docs: [] };
            var agenda2 = { title: "Review purpose of team", order: 2, docs: [{title:"Member List", source:"/docs/MemberList.txt"}] };
            var agenda3 = { title: "Identify challenges", order: 3, docs: [{ title: "Market Uncertainty", source: "/docs/Market.txt" }, { title: "New Trend", source: "/docs/Trend.txt" }] };
            var agenda4= { title: "Complete meeting", order: 4, docs: [] };

            $scope.agenda.push(agenda1, agenda2, agenda3, agenda4);

            $location.hash('agenda');
            $anchorScroll();
        };

        function clearAgenda() {
            $scope.agenda = [];
        };
    };

    app.controller("calendarCtrl", ["$scope", "$compile", "$location", "$anchorScroll", "uiCalendarConfig", calendarCtrl]);
}());
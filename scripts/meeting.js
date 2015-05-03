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
          { id: 10, title: '2015 Q1 Trustee Meeting', start: new Date(y, m, 1, 10, 0), start: new Date(y, m, 1, 11, 0), allDay: false },
          { id: 15, title: '2015 Q1 Investments Review', start: new Date(y, m, d + 1, 14, 0), end: new Date(y, m, d + 1, 17, 30), allDay: false },
          { id: 20, title: 'Year End Actuary Review', start: new Date(y, m, 28, 9, 0), end: new Date(y, m, 28, 10, 0), allday: false}
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
               { id: 100, type: 'Special', title: 'Special Trustee Meeting', start: new Date(y, m, d+4, 14, 0), end: new Date(y, m, d+4, 16, 0), allDay: false },
            ]
        };
        /* alert on eventClick */
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            //$scope.alertMessage = (date.title + ' was clicked ');            

            getAgenda(date.id);


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

        function getAgenda(meetingId) {
            clearAgenda();

            if (meetingId == 10){
                var agenda1 = { title: "Agenda Overview", order: 1};
                var agenda2 = { title: "Finanical Statements", order: 2, doc: { title: "Pension Plan 2015", source: "/docs/PensionPlan2011.PDF" } };
                var agenda3 = { title: "Review Membership", order: 3, doc: { title: "MPF AR 2015", source: "/docs/MPF_AR_2013-AODA.PDF" } };
                var agenda4 = { title: "Review Contributions", order: 4, doc: { title: "Contributions Performance", source: "/docs/PensionPlan2011.PDF" } };
                var agenda5 = { title: "Close Meeting", order: 5 };

                $scope.agenda.push(agenda1, agenda2, agenda3, agenda4, agenda5);
            }
            else if (meetingId == 100) {
                var agenda1 = { title: "Agenda Overview", order: 1};
                var agenda2 = { title: "Unfunded Liability Review", order: 2, doc: { title: "Pension Plan 2015 Liability Review", source: "/docs/PensionPlan2011.PDF" } };
                var agenda3 = { title: "Close Meeting", order: 3 };

                $scope.agenda.push(agenda1, agenda2, agenda3);
            }
            else if (meetingId == 15) {
                var agenda1 = { title: "Agenda Overview", order: 1 };
                var agenda2 = { title: "2014 Results", order: 2, doc: { title: "Pension Plan 2014", source: "/docs/PensionPlan2011.PDF" } };
                var agenda3 = { title: "2015 Forecast", order: 3, doc: { title: "Pension Plan 2015 Forcast", source: "/docs/PensionPlan2011.PDF" } };
                var agenda4 = { title: "Additions/Reductions Review", order: 4 };
                var agenda5 = { title: "Close Meeting", order: 5 };

                $scope.agenda.push(agenda1, agenda2, agenda3, agenda4, agenda5);
            }
            else if (meetingId == 20) {
                var agenda1 = { title: "Agenda Overview", order: 1 };
                var agenda2 = { title: "Review Actuary Extract", order: 2, doc: { title: "Actuary Report", source: "/docs/PensionPlan2011.PDF" } };
                var agenda3 = { title: "Address List of Questions", order: 3, doc: { title: "Questions", source: "/docs/PensionPlan2011.PDF" } };
                var agenda4 = { title: "Close Meeting", order: 4 };

                $scope.agenda.push(agenda1, agenda2, agenda3, agenda4);
            }

            setTimeout(function () {
                $location.hash('agenda');
                $anchorScroll();
            }, 200)

        };

        function clearAgenda() {
            $scope.agenda = [];
        };
    };

    app.controller("calendarCtrl", ["$scope", "$compile", "$location", "$anchorScroll", "uiCalendarConfig", calendarCtrl]);
}());
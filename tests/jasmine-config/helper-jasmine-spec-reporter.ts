import {SpecReporter} from "jasmine-spec-reporter";

jasmine.getEnv().clearReporters();

jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
        displayPending: true
    }
}));


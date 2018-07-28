
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { TestBed } from '@angular/core/testing';
import { <%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>Actions } from './<%= dasherize(name) %>.actions';
import { <%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>Factory, } from './<%= dasherize(name) %>.state';


describe('<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>Actions', () => {

    let actions: <%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>Actions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ],
            imports: [
                NgReduxTestingModule,
            ]
        });
        actions = TestBed.get(<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>Actions);
    });

    it('should be created', () => {
        expect(actions).toBeTruthy();
    });

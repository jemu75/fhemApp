import { createTextVNode as _createTextVNode, Fragment as _Fragment, createVNode as _createVNode } from "vue";
/// <reference types="../../../../types/cypress" />
import { VConfirmEdit } from "../index.mjs"; // Utilities
import { ref } from 'vue';

// Tests
describe('VConfirmEdit', () => {
  it('mirrors external updates', () => {
    const externalModel = ref('foo');
    cy.mount(() => _createVNode(VConfirmEdit, {
      "modelValue": externalModel.value
    }, {
      default: _ref => {
        let {
          model
        } = _ref;
        return _createVNode("p", null, [model.value]);
      }
    })).get('p').should('have.text', 'foo').then(() => {
      externalModel.value = 'bar';
    }).get('p').should('have.text', 'bar');
  });
  it.only(`doesn't mutate the original value`, () => {
    const externalModel = ref(['foo']);
    cy.mount(_createVNode(VConfirmEdit, {
      "modelValue": externalModel.value,
      "onUpdate:modelValue": $event => externalModel.value = $event
    }, {
      default: _ref2 => {
        let {
          model
        } = _ref2;
        return _createVNode(_Fragment, null, [_createVNode("p", null, [model.value.join(',')]), _createVNode("button", {
          "data-test": "push",
          "onClick": () => model.value.push('bar')
        }, [_createTextVNode("Push")])]);
      }
    })).get('p').should('have.text', 'foo').get('[data-test="push"]').click().get('p').should('have.text', 'foo,bar').then(() => {
      expect(externalModel.value).to.deep.equal(['foo']);
    });
    cy.contains('.v-btn', 'OK').click();
    cy.get('p').should('have.text', 'foo,bar').then(() => {
      expect(externalModel.value).to.deep.equal(['foo', 'bar']);
    });
  });
  it('hides actions if used from the slot', () => {
    cy.mount(_createVNode(VConfirmEdit, null, null)).get('.v-btn').should('have.length', 2);
    cy.mount(_createVNode(VConfirmEdit, null, {
      default: _ref3 => {
        let {
          model
        } = _ref3;
        void model;
      }
    })).get('.v-btn').should('have.length', 2);
    cy.mount(_createVNode(VConfirmEdit, null, {
      default: _ref4 => {
        let {
          actions
        } = _ref4;
        void actions;
      }
    })).get('.v-btn').should('have.length', 0);
    cy.mount(_createVNode(VConfirmEdit, null, {
      default: _ref5 => {
        let {
          actions
        } = _ref5;
        return actions;
      }
    })).get('.v-btn').should('have.length', 2);
  });
});
//# sourceMappingURL=VConfirmEdit.spec.cy.mjs.map
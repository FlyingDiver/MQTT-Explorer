import { Edge, Tree, TreeNode, TreeNodeFactory } from '../'
import { expect } from 'chai';
import 'mocha';

import './TreeNode.findNode'

describe('TreeNode', () => {
  it('updateWithNode should update value', () => {
    const topics = 'foo/bar'.split('/')
    const leaf = TreeNodeFactory.fromEdgesAndValue(topics, 3)
    expect(leaf.value).to.eq(3)
    const updateLeave = TreeNodeFactory.fromEdgesAndValue(topics, 5)
    leaf.firstNode().updateWithNode(updateLeave.firstNode())

    expect(leaf.firstNode().sourceEdge.name).to.eq(updateLeave.firstNode().sourceEdge.name)
    expect(leaf.value).to.eq(5)
  })

  it('updateWithNode should update intermediate nodes', () => {
    const topics1 = 'foo/bar/baz'.split('/')
    const leaf = TreeNodeFactory.fromEdgesAndValue(topics1, 3)
    expect(leaf.value).to.eq(3)

    const topics2 = 'foo/bar'.split('/')
    const updateLeave = TreeNodeFactory.fromEdgesAndValue(topics2, 5)
    leaf.firstNode().updateWithNode(updateLeave.firstNode())

    let barNode = leaf.firstNode().findNode('foo/bar')
    expect(barNode && barNode.sourceEdge.name).to.eq('bar')
    expect(barNode && barNode.value).to.eq(5)

    expect(leaf.sourceEdge.name).to.eq('baz')
    expect(leaf.value).to.eq(3)
  })

  it('updateWithNode should add nodes to the tree', () => {
    const topics1 = 'foo/bar'.split('/')
    const leaf1 = TreeNodeFactory.fromEdgesAndValue(topics1, 3)

    const topics2 = 'foo/bar/baz'.split('/')
    const leaf2 = TreeNodeFactory.fromEdgesAndValue(topics2, 5)

    leaf1.firstNode().updateWithNode(leaf2.firstNode())

    let expectedNode = leaf1.firstNode().findNode('foo/bar/baz')
    if (!expectedNode) {
      expect.fail('merge seems to have failed')
      return
    }
  })
});

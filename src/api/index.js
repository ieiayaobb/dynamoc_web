import AWS from 'aws-sdk'
import _ from 'lodash'

var dynamodb

export const connect = (host, accessKey, accessSecret) => {
  AWS.config.update({
    region: 'cn-north',
    endpoint: 'http://' + host,
    accessKeyId: accessKey,
    secretAccessKey: accessSecret
  })

  dynamodb = new AWS.DynamoDB()
}

export const scan = (tableName, lastEvaluatedKey) => {
  return new Promise(function (resolve, reject) {
    dynamodb.scan({
      TableName: tableName,
      Limit: 20,
      ExclusiveStartKey: lastEvaluatedKey
    }, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        resolve(data)
      }
    })
  })
}

export const record = (tableName, payload) => {
  return new Promise(function (resolve, reject) {
    dynamodb.getItem({
      TableName: tableName,
      Key: payload
    }, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        resolve(data)
      }
    })
  })
}

export const info = (tableName) => {
  return new Promise(function (resolve, reject) {
    dynamodb.describeTable({
      TableName: tableName
    }, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        resolve(data)
      }
    })
  })
}

export const list = () => {
  return new Promise(function (resolve, reject) {
    dynamodb.listTables({}, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        resolve(data)
      }
    })
  })
}

export const deleteByTableName = (tableName) => {
  return new Promise(function (resolve, reject) {
    console.log(tableName)
    dynamodb.deleteTable({TableName: tableName}, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        resolve(data)
      }
    })
  })
}

export const query = (tableName, indexName, hashKey, rangeKey, hashValue, rangeValue) => {
  var expressionAttributeNames = {
    '#hk_anchor': hashKey
  }
  var keyConditionExpression
  if (!_.isUndefined(rangeValue) && !_.isEmpty(rangeValue)) {
    expressionAttributeNames['#rk_anchor'] = rangeKey
    keyConditionExpression = '#hk_anchor = :hv_anchor AND #rk_anchor = :rv_anchor'
  } else {
    keyConditionExpression = '#hk_anchor = :hv_anchor'
  }
  var expressionAttributeValues = {
    ':hv_anchor': {
      'S': hashValue
    }
  }
  if (!_.isUndefined(rangeValue) && !_.isEmpty(rangeValue)) {
    expressionAttributeValues[':rv_anchor'] = {
      'S': rangeValue
    }
  }

  var queryExpression = {
    TableName: tableName,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    Limit: 20
  }

  if (!_.isEmpty(indexName)) {
    queryExpression['IndexName'] = indexName
  }
  console.log(queryExpression)
  return new Promise(function (resolve, reject) {
    dynamodb.query(queryExpression, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        resolve(data)
      }
    })
  })
}
